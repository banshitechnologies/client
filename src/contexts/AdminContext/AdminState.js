import adminContext from "./AdminContext";
const AdminState = ({children})=>{



    const state = {

    }
    return(
        <adminContext.Consumer value = {state}>
            {children}
        </adminContext.Consumer>
    )
}

export default AdminState;