import React from 'react'
import CardAdminStatus from '../../../utilis/CardAdminStatus/CardAdminStatus'
import styles from './Dashboard.module.scss'
import OrderList from '../../../utilis/OrderList/OrderList'
import Loading from '../../../utilis/Loading/Loading'
import { ToastContainer } from 'react-toastify'
import { GetAllOrdersHook } from '../../HookAdmin/Orders/GetAllOrdersHook'
export default function Dashboard() {

    // const [isLoading, orders] = GetLimitOrdersHook()
    const [isLoading, padding, shipped, orders, totaleIncome, totalIncomToday, onPressPaginate, paginationResult] = GetAllOrdersHook()


    // eslint-disable-next-line react/jsx-key
    const icons = [<i className="fa-solid fa-cart-shopping"></i>, <i className="fa-solid fa-circle-check"></i>, <i className="fa-solid fa-truck"></i>, <i className="fa-solid fa-money-bill-wave"></i>]


    return (
        <div className={styles.Dashboard} >
            <div className={styles.title}>
                <h1>Dashboard</h1>
            </div>
            {isLoading ? <Loading /> : null}
            <div className={styles.cardsAdmin}>

                <CardAdminStatus text={'ORDER PENDING'} color={'#7C6FB8'} icon={icons[0]} number={orders.length - shipped} /> {/* Get Pending order  : by divide tottal shiiped from all orders */}
                <CardAdminStatus text={'ORDER CONFIRMED'} color={'#006BA9'} icon={icons[1]} number={shipped} />
                <CardAdminStatus text={'Today Earnings'} color={'#0D6603'} icon={icons[3]} number={`$ ${totalIncomToday}`} />
                <CardAdminStatus text={'All Earnings'} color={'#4AA53F'} icon={icons[3]} number={`$ ${totaleIncome}`} />


            </div>

            <div className={styles.listOrders}>

                <OrderList orders={orders} />
            </div>
            <ToastContainer />
        </div>
    )
}
