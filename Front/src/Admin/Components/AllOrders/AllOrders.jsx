import React from 'react'
import styles from './AllOrders.module.scss'
import { Link } from 'react-router-dom'
import { GetAllOrdersHook } from '../../HookAdmin/Orders/GetAllOrdersHook'
import ReactPaginate from 'react-paginate';
import { RemoveOrderHook } from '../../HookAdmin/Orders/RemoveOrderHook'
import Loading from '../../../utilis/Loading/Loading'
export default function AllOrders() {
    const [isLoading, padding, shipped, orders, totaleIncome, totalIncomToday, onPressPaginate, paginationResult] = GetAllOrdersHook()

    const [deleteOrder] = RemoveOrderHook()
    return (
        <div className={styles.ordersPage}>


            <div className={styles.AllOrders}>
                {isLoading ? <Loading /> : null}
                <div className={styles.orderCol1}>
                    <p>Recent Orders</p>

                </div>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>


                        </tr>
                    </thead>
                    <tbody>

                        {orders?.length >= 1 ? orders?.map((item, index) => {
                            return (
                                <tr key={index}>

                                    <td>#{item._id}</td>
                                    <td>{item.shippingAddress.name}</td>
                                    <td>{item.isDelivered ? <p className={styles.shipped}>shipped</p> : <p className={styles.pending}>Pending</p>}</td>
                                    <td>${item.totalOrderPrice}</td>
                                    <td > <div className={`${styles.icons}`} >

                                        <i onClick={() => deleteOrder(item._id)} className={`${styles.remove}  fa-solid fa-trash-can`} ></i>
                                        <Link to={`${item._id}`}><i className={`${styles.update} fa-solid fa-pen-to-square `}></i></Link>

                                    </div></td>
                                </tr>)
                        }) : <p>No Orders</p>}


                    </tbody>
                </table>

            </div>


            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"


                pageCount={paginationResult?.numberOfPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                onPageChange={onPressPaginate}

                breakClassName={styles.breakClassName}
                containerClassName={styles.containerClassName}
                pageClassName={styles.pageClassName}
                pageLinkClassName={styles.pageLinkClassName}
                previousClassName={styles.previousClassName}
                nextClassName={styles.nextClassName}


                activeClassName={styles.activeClassName}
            />

        </div >
    )
}
