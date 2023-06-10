import React from 'react'
import styles from './Order.module.scss'
export default function Order() {

  return (



    <div className={styles.OrderDetailes}>


      <div className={styles.OrderItems}>

        <div className={styles.text}>
          <p className={styles.MiniTitleAdmin}>Ordere #3</p>
          <p className={styles.statusOrder}>Padding</p>
        </div>
        <hr></hr>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Total</th>



            </tr>
          </thead>
          <tbody>
            <tr>

              <td>#2</td>
              <td>Yassine</td>
              <td>Shiiped</td>
              <td>$200</td>

            </tr>
            <tr>

              <td>#2</td>
              <td>Yassine</td>
              <td>Shiiped</td>
              <td>$200</td>

            </tr>
            <tr>

              <td>#2</td>
              <td>Yassine</td>
              <td>Shiiped</td>
              <td>$200</td>

            </tr>

          </tbody>
        </table>

        <div className={styles.totalOrder}><p>Total Order:</p><p>$256.99</p></div>
      </div>

      <div className={styles.OrderHistory}>
        <p className={styles.MiniTitleAdmin}>Order History</p>
        <hr></hr>
        <label>
          ORDER STATUS:

          <select>

            <option>Delevery</option>
            <option>Canceld</option>
          </select>
        </label>

      </div>

      <div className={styles.DeliveryAddres}>
        <p className={styles.MiniTitleAdmin}>Order History</p>
        <hr></hr>
        <div className={styles.shippingAddress}>
          <p><i className="fa-solid fa-user"></i>Yassine Bouchama</p>
          <p><i className="fa-solid fa-phone-flip"></i>06359759855</p>
          <p><i className="fa-solid fa-tree-city"></i>safi</p>
          <p><i className="fa-solid fa-location-dot"></i> 21 rue ishak mousili qu moulay haj</p>
        </div>

      </div>

    </div>
  )
}
