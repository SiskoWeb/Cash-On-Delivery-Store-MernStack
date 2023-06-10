import styles from './EditProduct.module.scss'

import { ToastContainer } from 'react-toastify';
import { UpdateProductHook } from '../../HookAdmin/Product/UpdateProductHook'
import { GetCategoryHook } from '../../HookAdmin/Category/GetCategoryHook';
import Loading from '../../../utilis/Loading/Loading';
import ErrorPopUp from '../../../utilis/ErrorPopUp/ErrorPopUp';
import addImg from '../../../assets/addimg.png'
export default function EditProduct() {
    const [ignoreThisValue, Categories] = GetCategoryHook()
    const [onSubmit, handleChange, formInputData, handleChangeImageCover, mainImage, onRemoveImage, handleChangeImages, listimages, isloading, error] = UpdateProductHook()

    return (
        <div>
            {isloading ? <Loading /> : null}
            {error ? <ErrorPopUp /> : null}
            <div className={styles.title}>
                <h3>Update Product</h3>
            </div>


            <div className={styles.ProductAdd}>



                <div className={styles.container}>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}><h5>General</h5></div>


                        <div className={styles.cardBody}>
                            <div className={styles.formGroup}>
                                <label><p><span>*</span>Product Name</p><input className={styles.formControl} onChange={handleChange} value={formInputData.title} name="title" type='text' /></label>
                            </div>



                            <div className={styles.formGroup}>
                                <label><span>*</span>Price<input className={styles.formControl} onChange={handleChange} value={formInputData.price} name="price" type='number' /></label>
                            </div>


                            <div className={styles.formGroup}>
                                <label><span>*</span>Quantity<input className={styles.formControl} onChange={handleChange} value={formInputData.quantity} name="quantity" type='number' /></label>
                            </div>


                            <div className={styles.formGroup}>
                                <label className={styles.category}>

                                    <p><span>*</span>Product Category</p>
                                    <select onChange={handleChange} defaultValue='cat' name="category" >

                                        {Categories.length >= 1 ? Categories?.map((cat, index) => {
                                            if (cat._id === formInputData?.category) {

                                                return <option selected key={index} value={cat?._id}>{cat?.name}</option>


                                            }

                                            else {
                                                return <option key={index} value={cat._id}>{cat.name}</option>
                                            }
                                        })
                                            :
                                            <option disabled>No Product , add new one</option>}
                                    </select>

                                </label>
                            </div>






                            <div className={styles.formGroup}>
                                <label><p><span>*</span>Product Description</p> <textarea className={styles.formControl} onChange={handleChange} value={formInputData.description} name="description" type='text'></textarea></label>
                            </div>


                        </div>
                    </div>




                </div>






                <div className={styles.container}>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}><h5><span>*</span>Main Image</h5></div>


                        <div className={styles.cardBody}>

                            <div className={styles.imageCard}>

                                {mainImage.image ? <button onClick={() => onRemoveImage(0)}>Remove</button> : null}


                                <label htmlFor='imageCover' >


                                    <img src={mainImage.displayImageCover}></img>

                                    <input accept="image/png, image/jpeg" onChange={(evnt) => handleChangeImageCover(evnt)} name="imageCover" id='imageCover' type='file' />
                                </label>

                            </div>
                            <div className={styles.cardHeader}><h5>Images</h5></div>
                            <div className={styles.imagesCard}>

                                -
                                <div>
                                    {listimages[0]?.image ? <button onClick={() => onRemoveImage(1)}>Remove</button> : null}
                                    <label htmlFor='images1'>

                                        <img src={listimages[0]?.imageDisplay}></img>
                                        Click to Upload
                                        <input accept="image/png, image/jpeg" onChange={(e) => handleChangeImages(e.target.files[0], 1)} name="images1" id='images1' type='file' />
                                    </label>
                                </div>

                                <div>
                                    {listimages[1]?.image ? <button onClick={() => onRemoveImage(2)}>Remove</button> : null}

                                    <label htmlFor='images2'>
                                        <img src={listimages[1]?.imageDisplay}></img>
                                        Click to Upload
                                        <input accept="image/png, image/jpeg" onChange={(e) => handleChangeImages(e.target.files[0], 2)} name="images2" id='images2' type='file' />
                                    </label>
                                </div>

                                <div>
                                    {listimages[2]?.image ? <button onClick={() => onRemoveImage(3)}>Remove</button> : null}

                                    <label htmlFor='images3'>
                                        <img src={listimages[2]?.imageDisplay}></img>
                                        Click to Upload
                                        <input accept="image/png, image/jpeg" onChange={(e) => handleChangeImages(e.target.files[0], 3)} name="images3" id='images3' type='file' />
                                    </label>
                                </div>
                                <div>
                                    {listimages[3]?.image ? <button onClick={() => onRemoveImage(4)}>Remove</button> : null}

                                    <label htmlFor='images4'>
                                        <img src={listimages[3]?.imageDisplay}></img>
                                        Click to Upload
                                        <input accept="image/png, image/jpeg" onChange={(e) => handleChangeImages(e.target.files[0], 4)} name="images4" id='images4' type='file' />
                                    </label>
                                </div>


                            </div>



                        </div>
                    </div>





                </div>
                <div className={styles.btnAddProduct}>
                    <button onClick={(e) => onSubmit(e)}>Add Product</button>
                </div>
            </div>


            <ToastContainer />
            <div>
            </div>

        </div>


    )
}


