import styles from './AddProduct.module.scss'

import { ToastContainer } from 'react-toastify';
import addImg from '../../../assets/addimg.png'
import { AddProductHook } from '../../HookAdmin/Product/AddProductHook'
import { GetCategoryHook } from '../../HookAdmin/Category/GetCategoryHook';
import Loading from '../../../utilis/Loading/Loading';
import JoditEditor from 'jodit-react';
export default function AddProduct() {

    const [ignoreThisValue, Categories] = GetCategoryHook()
    const [onSubmit, handleChange, formInputData, handleChangeImageCover, displayImageCover, imageCover, onRemoveImage, handleChangeImages, listimages, isloading, config, editor, content, setContent] = AddProductHook()




    return (



        <div>
            {isloading ? <Loading /> : null}
            <div className={styles.title}>
                <h3>Add New product</h3>
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
                                    <select required onChange={handleChange} value={formInputData.category} name="category">
                                        <option value='' selected disabled hidden>Choose here</option>
                                        {Categories.length >= 1 ? Categories?.map((cat, index) => <option key={index} value={cat._id}>{cat.name}</option>) : <option disabled>No Category , add new one</option>}


                                    </select>
                                </label>
                            </div>






                            <div className={styles.formGroup}>
                                <label><p><span>*</span>Product Description</p>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        config={config}
                                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons

                                    />
                                </label>
                            </div>


                        </div>
                    </div>




                </div>






                <div className={styles.container}>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}><h5>Main Image</h5></div>


                        <div className={styles.cardBody}>

                            <div className={styles.imageCard}>

                                {imageCover ? <button onClick={() => onRemoveImage(0)}>Remove</button> : null}


                                <label htmlFor='imageCover' >


                                    <img src={displayImageCover}></img>

                                    <input onChange={handleChangeImageCover} accept="image/png, image/jpeg" name="imageCover" id='imageCover' type='file' />
                                </label>

                            </div>
                            <div className={styles.imagesCard}>

                                -
                                <div>
                                    {listimages[0].image ? <button onClick={() => onRemoveImage(1)}>Remove</button> : null}
                                    <label htmlFor='images1'>

                                        <img src={listimages[0].imageDisplay}></img>
                                        Click to Upload
                                        <input accept="image/png, image/jpeg" onChange={(e) => handleChangeImages(e.target.files[0], 1)} name="images1" id='images1' type='file' />
                                    </label>
                                </div>

                                <div>
                                    {listimages[1].image ? <button onClick={() => onRemoveImage(2)}>Remove</button> : null}

                                    <label htmlFor='images2'>
                                        <img src={listimages[1].imageDisplay}></img>
                                        Click to Upload
                                        <input accept="image/png, image/jpeg" onChange={(e) => handleChangeImages(e.target.files[0], 2)} name="images2" id='images2' type='file' />
                                    </label>
                                </div>

                                <div>
                                    {listimages[2].image ? <button onClick={() => onRemoveImage(3)}>Remove</button> : null}

                                    <label htmlFor='images3'>
                                        <img src={listimages[2].imageDisplay}></img>
                                        Click to Upload
                                        <input accept="image/png, image/jpeg" onChange={(e) => handleChangeImages(e.target.files[0], 3)} name="images3" id='images3' type='file' />
                                    </label>
                                </div>
                                <div>
                                    {listimages[3].image ? <button onClick={() => onRemoveImage(4)}>Remove</button> : null}

                                    <label htmlFor='images4'>
                                        <img src={listimages[3].imageDisplay}></img>
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


            <ToastContainer
                autoClose={600} />
            <div>
            </div>
        </div>


    )
}


