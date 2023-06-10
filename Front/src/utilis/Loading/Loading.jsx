import styles from './Loading.module.scss'
export default function Loading() {
    return (
        <div className={styles.loading}>




            <div className={styles.cs_loader} >
                <div className={styles.cs_loader_inner} >
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                    <label>●</label>
                </div>
            </div>
        </div>

    )
}
