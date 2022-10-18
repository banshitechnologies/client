import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import logo from '../data/logo.png';
import { ColorPickerComponent } from "@syncfusion/ej2-react-inputs";
import Resizer from "react-image-file-resizer";
import axios from 'axios';


function BuyNow() {

    const { state } = useLocation();

    const [offers, setOffers] = useState();
    const [statusCount, setStatusCount] = useState(1);
    const [details, setDetails] = useState({
        needs: [],
        isExistownLogo: false,
        ownLogo: [],
        colors: {
            firstChoice: '',
            secondChoice: '',
            thirdchoice: ''
        },
        referance: false,
        referanceImages: [],
        websiteLink: ""
    });

    // resize files
    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    //   ---------------------------

    // get image start

    const changefColor = (args) => {
        setDetails({ ...details, colors: { ...details.colors, firstChoice: args.currentValue.hex } })
    }

    const changesColor = (args) => {
        setDetails({ ...details, colors: { ...details.colors, secondChoice: args.currentValue.hex } })
    }
    const changetColor = (args) => {
        setDetails({ ...details, colors: { ...details.colors, thirdchoice: args.currentValue.hex } })
    }


    // --------------------------

    const handleInput = async (e) => {
        const { name, value, type, checked, files } = e.target;
        if (name == "needs") {
            if (checked) {
                setDetails({ ...details, needs: [...details.needs, value] });
            }
        } else if (name == "isExistownLogo") {
            if (checked) {
                setDetails({ ...details, isExistownLogo: true });
            } else {
                setDetails({ ...details, isExistownLogo: false });
            }
        } else if (name == "ownLogo") {
            try {
                const file = files[0];

                const image = await resizeFile(file);
                setDetails({ ...details, ownLogo: image })
                console.log(image);
            } catch (err) {
                console.log(err);
            }
        } else if (name === "referance") {
            if (checked) {
                setDetails({ ...details, referance: true });
            } else {
                setDetails({ ...details, referance: false });
            }
        } else if (name === "logoReferance") {
            try {
                let images = [];
                console.log(files.length);
                for (let index = 0; index < files.length; index++) {
                    const image = await resizeFile(files[index]);
                    console.log(files[index]);
                    images = [...images, image]
                }

                setDetails({ ...details, referanceImages: [...details.referanceImages, ...images] })

            } catch (error) {
                console.log(error);
            }
        }



    }


    useEffect(() => {
        const arr = state.offers.split(',');
        setOffers(arr);
        console.log(details);
    }, [details])
    const submitDetails = async () => {

        setStatusCount(statusCount + 1)

        if (statusCount >= 4) {

            console.log(details.ownLogo);
            const formdata = new FormData();
            formdata.append('userid', '6341073ffb119fda637d0a98');
            formdata.append('selectedPackage', state.packageTitle);
            formdata.append('packageType', state.name);
            formdata.append('needs', details.needs);
            formdata.append('price', state.price);
            formdata.append('isAlreadyExist', details.isExistownLogo);
            formdata.append('logo', details.ownLogo);
            formdata.append('colors', Object.values(details.colors));
            formdata.append('choice', details.referance);

            details.referanceImages.map((item) => {
                formdata.append('image', item);
            })
            formdata.append('dataFOrweb', details.websiteLink);
            formdata.append('description', "ggfdaf");
            console.log(formdata.get('image'));
            await axios.post('http://localhost:3000/orders/order',
                formdata
            ).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
    return (
        <div>
            <div className="container">
                <div className="row justify-center">
                    <div className="col-md-5 col-sm-12">
                        {/* Start logo Secton */}
                        <div className="banshiLogo flex flex-column justify-content-center align-items-center mt-2">
                            <img src={logo} alt="logo" />

                            <h2 className='mt-3'>{state.packageTitle
                            }</h2>
                            <h2 className="planName mt-2">{state.name}</h2>

                        </div>

                        <div className="collectData flex flex-column justify-content-center align-items-center">
                            <form action="" enctype="multipart/form-data">
                                {
                                    statusCount === 1 ?
                                        <div className="needs mt-2 flex flex-column justify-content-center align-items-center">
                                            <div className="chooseYourNeeds"><h2>Choose Your Needs</h2></div>
                                            {
                                                offers ? offers.map((offer) => (
                                                    <div class="form-check coustom_check">
                                                        <input class="form-check-input" onChange={handleInput} type="checkbox" name='needs' value={offer} id={offer} />
                                                        <label class="form-check-label" for={offer}>
                                                            {offer}
                                                        </label>
                                                    </div>
                                                )) : ""
                                            }
                                        </div> : statusCount === 2 ?
                                            <div className="any_logo flex flex-column justify-content-center align-items-center">
                                                <div class="form-check coustom_check">
                                                    <input class="form-check-input" onChange={handleInput} name='isExistownLogo' type="checkbox" value="" id="existLogo" />
                                                    <label class="form-check-label" for="existLogo">
                                                        Do You Have Your Own Logo?
                                                    </label>
                                                </div>

                                                <form>
                                                    <div class="form-group any_logo_content">
                                                        <label for="exampleFormControlFile1"></label>
                                                        <input type="file" onChange={handleInput} name='ownLogo' class="form-control-file" id="exampleFormControlFile1" />
                                                    </div>
                                                </form>
                                            </div> : statusCount === 3 ?

                                                <>
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <ColorPickerComponent
                                                                    id="#firstChoice"
                                                                    mode="Picker"
                                                                    modeSwitcher={false}
                                                                    inline
                                                                    showButtons={false}
                                                                    change={changefColor} />
                                                            </div>

                                                            <div className="col-md-4">
                                                                <ColorPickerComponent
                                                                id="#secondChoice"
                                                                mode="Picker"
                                                                modeSwitcher={false}
                                                                inline
                                                                showButtons={false}
                                                                change={changesColor} />
                                                            </div>
                                                            
                                                            <div className="col-md-4">
                                                                <ColorPickerComponent
                                                                id="#thirdChoice"
                                                                mode="Picker"
                                                                modeSwitcher={false}
                                                                inline
                                                                showButtons={false}
                                                                change={changetColor} />
                                                            </div>
                                                            
                                                        </div>
                                                    </div>

                                                </>


                                                : statusCount === 4 ?

                                                    <div className="referance">
                                                        <div class="form-check coustom_check">
                                                            <input class="form-check-input" onChange={handleInput} type="checkbox" name='referance' value="referance" id="referance" />
                                                            <label class="form-check-label" for="referance">
                                                                Do You Have Any referance?
                                                            </label>
                                                        </div>
                                                        <input class="form-control" name='logoReferance' onChange={handleInput} type="file" id="formFileMultiple" multiple />

                                                    </div> : ''
                                }
                                <button type="button" onClick={submitDetails} class="btn btn-primary submitButton mt-3">Primary</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyNow
