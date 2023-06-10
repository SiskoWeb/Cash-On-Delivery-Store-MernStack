import React from 'react'
import styles from './OrderList.module.scss'
import { Link } from 'react-router-dom'
import { RemoveOrderHook } from '../../Admin/HookAdmin/Orders/RemoveOrderHook'
export default function OrderList({ orders }) {
    const [deleteOrder] = RemoveOrderHook()


    return (
        <div className={styles.OrderList}>
            <div className={styles.orderCol1}>
                <p>Recent Orders</p>
                <Link className={styles.orderBtn} to='/admin/orders'>View All</Link>
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
                                    <Link to={`orders/${item._id}`}><i className={`${styles.update} fa-solid fa-pen-to-square `}></i></Link>

                                </div></td>
                            </tr>
                        )
                    }) : <p>ther is no order </p>}


                </tbody>
            </table>
        </div >
    )
}
