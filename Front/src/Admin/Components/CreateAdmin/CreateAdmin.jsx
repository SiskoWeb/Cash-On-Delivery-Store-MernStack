import React from 'react'
import styles from './CreateAdmin.module.scss'
export default function CreateAdmin() {
    return (
        <div className={styles.adminsPage}>

            <div className={styles.createAdminContainer}>
                <h1>Create New Admin</h1>
                <form>
                    <div>
                        <label>name:<input type='text'></input></label>
                        <label>email:<input type='email'></input></label>
                    </div>
                    <div>
                        <label>password:<input type='password'></input></label>
                        <label>password:<input type='password'></input></label>
                    </div>
                    <div>
                        <label>key:<input type='text'></input></label>
                    </div>


                </form>
                <button>Submit</button>
            </div>


            <hr></hr>

            <table className={styles.table}>
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Role</th>
                        <th>Created</th>
                        <th>Actions</th>


                    </tr>

                </thead>
                <tbody>


                    <tr >


                        <td>Yassine</td>
                        <td>admin</td>
                        <td>Crated</td>
                        <td > <div className={`${styles.icons}`} >

                            <i className={`${styles.remove}  fa-solid fa-trash-can`} ></i>


                        </div></td>
                    </tr>



                </tbody>
            </table>

        </div >
    )
}
