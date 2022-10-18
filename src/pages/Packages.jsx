import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation,useNavigate } from "react-router-dom";
function Packages() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [allServices, setAllServices] = useState();
    const title = state.title;
    const getPackages = async () => {
        await axios.get(`getallpackage/${title}`)
            .then(function (response) {
                
                setAllServices(response.data[0].packagesd)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    const navigateToBuyNow = (ser,title)=>{
        navigate(`/packages/buynow/${ser.name}`,{state:{offers: ser.offers,price: ser.price,name:ser.name,packageTitle: title}})
    }

    useEffect(() => {
        getPackages();

    }, [allServices])
    return (
        <div>
            <div className="container">
                <div className="row">
                    {
                        allServices ? allServices.map((ser) => (
                            
                            <div id={ser.name} className="col-lg-3 col-md-4 mb-4">
                                <div className="card border border-primary text-center">

                                    <div className="card-header bg-white py-3">
                                        <p className="text-uppercase mb-2"><strong>{ser.name?ser.name:"name"}</strong></p>
                                        <h2 className="mb-0 price">{ser.price?"$"+ser.price:"price"}</h2>
                                    </div>

                                    <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                            {
                                             ser.offers.split(',').map((offer)=>(
                                                <>
                                                <li className="list-group-item border-none">{offer}</li>
                                            </>
                                             ))
                                            }
                                        </ul>
                                    </div>

                                    <div class="card-footer flex justify-center bg-white">
                                        <button type="button" onClick={(e)=>navigateToBuyNow(ser,title)} className="btn btn-primary btn-sm">Buy now</button>
                                    </div>
                                </div>
                            </div>
                        )) : "nodata to show"
                    }


                </div>
            </div>
        </div>
    )
}

export default Packages
