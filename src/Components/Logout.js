import React from 'react';
import logout from '../Functions/logout';

const Logout = () => {
    return (
        <button
            type="button"
            className="btn btn-sm btn-dark py-2 px-4 m-2"
            onClick={logout}
        >
            Logout
        </button>
    )
}

export default Logout;