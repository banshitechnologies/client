import React, { useContext, useEffect, useState } from "react";
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { MdDevices,MdGraphicEq,MdAppSettingsAlt,MdDvr } from "react-icons/md";
import Cookies from 'js-cookie';
import authContext from "../contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function OurServices() {
  const context = useContext(authContext);
  const navigate = useNavigate();
  const [allPackages, setAllPackage] = useState([]);
  const [token,setToken] = useState();
  const showPackages = (id,name)=>{
    navigate(`/packages/${name}`,{state:{title:name,id:id}});
  }
  useEffect(() => {
    setToken(Cookies.get('user'));
    if (context.token !== undefined) {
      navigate('/');
    }else{
      navigate('/login');
    }

    const packages = axios.get('packages/getallpackage')
    .then(function (response) {
      console.log(response);
      setAllPackage(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

  }, [token]);
  return (
    <div>
      <div className="container">
        <div className="row">
          {
           
           allPackages.map((packagea)=>(
        
              <div className="col-md-3" key={packagea._id}>
            <div className='flex m-3 flex-wrap justify-center gap-1 items-center'>
              <div className="bg_colorblue text-center h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl"
              >
                <button
                  type="button"
                  style={{ color: '#ffff', backgroundColor: '#21e1e187' }}
                  className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
                  onClick={()=>showPackages(packagea._id,packagea.title)}
                >
                 <MdDevices/>
                </button>
                <p className="mt-3">
                </p>
                <p className="text-sm text-gray-400">{packagea.title}</p>
              </div>
            </div>

          </div>
           ))
          }
        </div>
      </div>
    </div>
  )
}

export default OurServices
