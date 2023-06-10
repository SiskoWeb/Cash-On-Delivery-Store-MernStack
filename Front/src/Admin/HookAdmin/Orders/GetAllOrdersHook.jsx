import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import { getAllOrdersRedux } from "../../../Redux/OrdersSlice/ActionsOrders"


export const GetAllOrdersHook = () => {

    const [padding, setPadding] = useState(0)
    const [shipped, setShipped] = useState(0)
    const [paginationResult, setPaginationResult] = useState({})
    const [totalIncomToday, setTotalIncomToday] = useState(0)
    const [totaleIncome, setTotaleIncome] = useState(0)
    const [orders, setOrders] = useState([])

    const dispatch = useDispatch()






    const OrderList = useSelector((state) => state.orders.OrderList)
    const isLoading = useSelector((state) => state.orders.isloading)

    /// @desc :get tottal income from only delevred orders
    const TotalIncom = (data) => {


        data.map(item => {
            if (!item.isDelivered === true) return;
            else {
                return setTotaleIncome(totalIncomToday + item.totalOrderPrice)

            }
        })

    }



    /// @desc :get today income in last 24hourse    
    const TotalIncomToday = async (data) => {
        let result = 0;
        let date = await (new Date()).getTime() - 24 * 60 * 60 * 1000;
        let dayTransactions = await data.filter((item) => (new Date(item.created_at)).getTime() >= date);

        dayTransactions.map(item => {
            if (!item.isDelivered === true) return;
            else {
                return setTotalIncomToday(totalIncomToday + item.totalOrderPrice)

            }
        })



        setTotalIncomToday(result)
    }




    /// @desc: get tottal of ordr delivred
    const GetNumberDelivered = (data) => {
        let result = 0;
        for (var i = 0; i < data.length; i++) {


            if (data[i]?.isDelivered) {
                result = result + 1

            }

        }
        setShipped(result)
    }



    useEffect(() => {

        //@desc get 10 last orders from server by  redux 
        dispatch(getAllOrdersRedux())



    }, [])


    const onPressPaginate = async (event) => {
        console.log(event.selected + 1)

        await dispatch(getAllOrdersRedux(event.selected + 1))

    }



    //@desc after remove order list update
    useEffect(() => {

        if (OrderList.status === 200) {


            if (OrderList.data.data) {
                setOrders(OrderList.data.data) //@desc push orders  to order state
                setPaginationResult(OrderList.data.paginationResult)//@desc pushcount of pages and orders 
                TotalIncom(OrderList.data.data)//@desc push Total Incom all time
                GetNumberDelivered(OrderList.data.data)//@desc push total of order is deliverd
                TotalIncomToday(OrderList.data.data)//@desc push Total Incom inlast 24Hourse



            }

        }


        else {

            //     //@ if we get error
            if (OrderList?.data) {
                if (OrderList.data.message) {
                    setOrders([])
                }

            }

        }
    }, [OrderList])


    return [isLoading, padding, shipped, orders, totaleIncome, totalIncomToday, onPressPaginate, paginationResult]


} 