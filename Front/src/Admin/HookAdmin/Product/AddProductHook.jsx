import { useEffect, useMemo, useRef, useState } from "react"
import notify from "../../../Hooks/useNotifaction"
import { useDispatch, useSelector } from "react-redux"
import { AddProduct } from "../../../Redux/productsSlice/ActionsProducts"
import addImg from '../../../assets/addimg.png'


export const AddProductHook = () => {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)


    const [displayImageCover, setDisplayImageCover] = useState(addImg)
    const [imageCover, setImageCover] = useState(null)
    const editor = useRef(null);

    const [content, setContent] = useState('');

    const [formInputData, setformInputData] = useState(
        {
            title: '',
            // description: '',
            quantity: Number,
            price: Number,
            category: '',

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


    /// Text Rich ===================

    const config = {
        placeholder: 'Start typings...'
    }





    //@desc get images from user (second Images)
    const handleChangeImages = (image, id) => {
        const updatedList = listimages.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    image: image, imageDisplay: URL.createObjectURL(image)// Replace 'image' + id with the actual image value
                };
            }
            return item;
        });

        setListimages(updatedList);
        console.log(updatedList)

    };





    //@desc get data from inputs not include images
    const handleChange = (evnt) => {
        const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value })
        setformInputData(newInput)

    }

    //@desc get images from user (main Image)
    const handleChangeImageCover = (evnt) => {
        setImageCover(evnt.target.files[0])
        setDisplayImageCover(URL.createObjectURL(evnt.target.files[0]))
    }








    //@desc cleare input image by imageselected
    const onRemoveImage = (id) => {
        if (0 === id) {
            setImageCover(null)
            setDisplayImageCover(addImg)
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
            console.log(updatedList)
        }


    }

    const addProductResponse = useSelector(state => state.products.addProductResponse)
    const isloading = useSelector(state => state.products.isloading)





    // @desc upload data to Server 
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(editor.current?.value)
        //@desc  valuesValidator
        if (formInputData.title.length <= 3) {
            notify('title to short', 'warn')
            return
        }
        if (editor.current?.value.length <= 20) {
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
        if (formInputData.category === '') {
            notify('category is empty', 'warn')
            return
        }
        if (imageCover === null) {
            notify('you forget imageCover empty', 'warn')
            return
        }

        // const checkEmptyInput = !Object.values(formInputData).every(res => res === "")



        else {
            setLoading(true)

            // @desc create new form from buildin FromData
            const formData = new FormData()
            formData.append('title', formInputData.title)
            formData.append('description', editor.current?.value)
            formData.append('quantity', parseInt(formInputData.quantity))
            formData.append('price', parseInt(formInputData.price))
            formData.append('category', formInputData.category)
            formData.append('imageCover', imageCover)

            //@desc Looping in images to add it in formdata
            listimages.map(item => formData.append('images', item.image))


            //@desc fun create Category  passing ID + naem & image
            await dispatch(AddProduct(formData))

            //@dex switchh loading to false to active validator inside useEffect
            setLoading(false)
        }
    }







    useEffect(() => {



        if (loading === false) {


            console.log(addProductResponse)
            if (addProductResponse.status === 200) {
                //@ if category created 
                if (addProductResponse.data.data.createdAt) {
                    notify('category created', 'success')


                    setformInputData({
                        title: '',
                        description: '',
                        quantity: Number,
                        price: Number,
                        category: '',

                    })
                    setListimages([
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

                    ])
                    setImageCover(null)
                    setDisplayImageCover(addImg)
                    setContent('')
                }
            }
            else {

                //     //@ if we get error
                if (addProductResponse?.data) {

                    if (addProductResponse.data.message.includes("quantity")) {
                        notify("quantity uncourrect", "error")
                        console.log("pb quantity    ")

                    }
                    if (addProductResponse.data.message.includes("price")) {
                        notify("price uncourrect", "error")
                        console.log("pb price    ")

                    }
                    if (addProductResponse.data.message.includes("category")) {
                        notify("category uncourrect", "error")
                        console.log("pb category    ")

                    }
                    if (addProductResponse.data.message.includes("title")) {
                        notify("title uncourrect", "error")
                        console.log("pb title    ")

                    }
                    if (addProductResponse.data.message.includes("description")) {
                        notify("description uncourrect", "error")
                        console.log("pb description    ")

                    }
                    if (addProductResponse.data.message.includes("imageCover")) {
                        notify("imageCover uncourrect", "error")
                        console.log("pb imageCover    ")

                    }

                }



            }
        }


    }, [loading])


    return [onSubmit, handleChange, formInputData, handleChangeImageCover, displayImageCover, imageCover, onRemoveImage, handleChangeImages, listimages, isloading, config, editor, content, setContent]
} 