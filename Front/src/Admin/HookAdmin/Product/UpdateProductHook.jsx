import { useEffect, useState } from "react"
import notify from "../../../Hooks/useNotifaction"
import { useDispatch, useSelector } from "react-redux"
import { AddProduct, getOneProductRedux, updateProductRedux } from "../../../Redux/productsSlice/ActionsProducts"
import addImg from '../../../assets/addimg.png'
import { useParams } from "react-router-dom"


export const UpdateProductHook = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    const [id, setId] = useState(params.id)
    const [error, sesetError] = useState(false)


    // const [displayImageCover, setDisplayImageCover] = useState(addImg)
    const [mainImage, setMainImage] = useState(
        {
            image: null,
            displayImageCover: addImg
        })



    const [formInputData, setformInputData] = useState(
        {
            title: '',
            description: '',
            quantity: Number,
            price: Number,
            category: null,

        }
    );



    const [listimages, setListimages] = useState([
        {
            id: 1,
            image: null,
            imageDisplay: addImg
        },
        {
            id: 2,
            image: null,
            imageDisplay: addImg
        },
        {
            id: 3,
            image: null,
            imageDisplay: addImg
        },
        {
            id: 4,
            image: null,
            imageDisplay: addImg
        }
    ]);




    //@desc get data for spicific product by params.id
    useEffect(() => {

        const getOneProduct = async () => {

            await dispatch(getOneProductRedux(id))
        }

        getOneProduct()

    }, [])



    const GetOneProduct = useSelector(state => state.products.GetOneProduct)
    const isloading = useSelector(state => state.products.isloading)





    //@desc after remove order list update
    useEffect(() => {

        if (GetOneProduct.status === 200) {
            console.log(GetOneProduct.data.data.images)

            if (GetOneProduct.data.data) {
                sesetError(false)

                //@desc add image from sserver to inputs
                setMainImage({
                    image: null,
                    displayImageCover: GetOneProduct.data.data.imageCover
                })



                if (GetOneProduct.data.data.images) {
                    const fetchData = async () => {

                        // Create a new list of images based on the API response
                        if (GetOneProduct.data.data.images.length === 0) {
                            return; // No URLs, keep the original state
                        }

                        else {
                            //@desc Mapping through images from api and put it in listImages Array 
                            const updatedList = await listimages.map((item, index) => {
                                const imageDisplay = index < GetOneProduct.data.data.images.length ? GetOneProduct.data.data.images[index] : addImg;
                                const image = index < GetOneProduct.data.data.images.length ? GetOneProduct.data.data.images[index] : null;
                                return { ...item, imageDisplay, image };

                            });
                            setListimages(updatedList);
                        }
                    }
                    fetchData();
                }







                //@desc add data from server to inputs
                setformInputData({
                    title: GetOneProduct.data.data.title,
                    description: GetOneProduct.data.data.description,
                    quantity: GetOneProduct.data.data.quantity,
                    price: GetOneProduct.data.data.price,
                    category: GetOneProduct.data.data.category?._id || null,
                });


            }




            else {

                //     //@ if we get error
                if (GetOneProduct?.data) {
                    if (GetOneProduct.data.message) {
                        sesetError(true)
                    }

                }

            }
        }
    }, [GetOneProduct])






    // //@desc get images from user (second Images)
    const handleChangeImages = async (image, id) => {



        // Update the image object in the listimages state
        const updatedListImages = await listimages.map((item) => {
            // Replace 'image' + id with the actual image value
            if (item.id === id) {
                return {
                    ...item,
                    image: image,
                    imageDisplay: URL.createObjectURL(image)
                };
            }
            return item;
        });

        setListimages(updatedListImages);
    };



    //@desc get data from inputs not include images
    const handleChange = (evnt) => {
        const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value })
        setformInputData(newInput)

    }

    //@desc get images from user (main Image)
    const handleChangeImageCover = (evnt) => {

        setMainImage({
            image: evnt.target.files[0],
            displayImageCover: URL.createObjectURL(evnt.target.files[0])
        })

    }





    //@desc cleare input image by imageselected
    const onRemoveImage = (id) => {
        if (0 === id) {

            setMainImage({
                image: null,
                displayImageCover: addImg
            })
        }
        else {
            const updatedList = listimages.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        image: null, imageDisplay: addImg
                    };
                }
                return item;
            });

            setListimages(updatedList);

        }


    }

    const convertUrlToFile = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

        return file;
    };

    // @desc upload data to Server 
    const onSubmit = async (e) => {

        e.preventDefault()
  



        //@desc  valuesValidator
        if (formInputData.title.length <= 3) {
            notify('title to short', 'warn')
            return
        }
        if (formInputData.description.length <= 20) {
            notify('description to short', 'warn')
            return
        }
        if (formInputData.quantity === '') {
            notify('quantity is empty', 'warn')
            return
        }
        if (parseInt(formInputData.quantity) < 0) {
            notify('quantity should be more then 1', 'warn')
            return
        }
        if (formInputData.price === '' || parseInt(formInputData.price) >= 200000) {
            notify('price is empty or bigger', 'warn')
            return
        }
        if (formInputData.category === null) {
            notify('category is empty', 'warn')
            return
        }
        if (mainImage.displayImageCover === addImg) {
            notify('you forget imageCover empty', 'warn')
            return
        }




        //@desc if all values valid fo this
        else {

            // @desc create new form from buildin FromData
            const formData = new FormData()



            let itemImages = []

            const conve = async () => {
                //@desc mapping through listimages array  and get only new array contain only old and new images 
                const news = await listimages.filter((item) => {
                    if (item.image !== null) return item
                });



                if (news.length >= 1) {
                    //convert array of url image to file 
                    news.map(
                        (img, index) => {
                            //1) check is this image is url  
                            const exist = img.imageDisplay.includes('.jpeg')

                            //2)conver it to URL
                            if (exist) {
                                convertUrlToFile(img.image).then(val => itemImages.push(val))
                                console.log('url')
                            }
                            else {
                                itemImages.push(img.image)
                                console.log('no url')
                            }
                        })
                }
            }
            conve()

            setTimeout(() => {
                itemImages.length > 1 ? itemImages.forEach((item) => formData.append('images', item)) : formData.append('images', null)



                console.log('from timeout')
            }, 1000);


            //@desc check if user change img if yes add it into form if not updae only name
            if (mainImage.image === null) {
                formData.append('title', formInputData.title)
                formData.append('description', formInputData.description)
                formData.append('quantity', parseInt(formInputData.quantity))
                formData.append('price', parseInt(formInputData.price))
                formData.append('category', formInputData.category)
            }

            else {
                formData.append('title', formInputData.title)
                formData.append('description', formInputData.description)
                formData.append('quantity', parseInt(formInputData.quantity))
                formData.append('price', parseInt(formInputData.price))

                formData.append('category', formInputData.category)

                formData.append('imageCover', mainImage.image)

            }


            //@desc fun create Category  passing ID + naem & image
            setTimeout(async () => {
                setLoading(true)
                await dispatch(updateProductRedux({ id, formData }))

                setLoading(false)    //@dex switchh loading to false to active validator inside useEffect
            }, 1000);


        }
    }



    const UpdateResponse = useSelector(state => state.products.UpdateResponse)




    useEffect(() => {



        if (loading === false) {


            if (UpdateResponse.status === 201) {
                //@ if category created 
                if (UpdateResponse.data.data.createdAt) {
                    notify('Product Updated', 'success')

                    dispatch(getOneProductRedux(id))

                }
            }
            else {

                //     //@ if we get error
                if (UpdateResponse?.data) {

                    if (UpdateResponse.data.message) {
                        notify(" uncourrect", "error")
                        console.log("pb     ")

                    }


                }



            }
        }


    }, [loading])


    return [onSubmit, handleChange, formInputData, handleChangeImageCover, mainImage, onRemoveImage, handleChangeImages, listimages, isloading, error]
} 