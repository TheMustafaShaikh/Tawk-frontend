import React from 'react'
import SearchImage from "../pages/assets/images/search.png"

export default function header() {
    return (
        <div>
            <div className="section-1">
                <div className="main-heading">
                    <h1>Knowledge base doesn't have to be boring</h1>
                    
                    <p>Everything you need to Manage your Messaging</p>
                </div>


                {/* serach section */}


                <div className="search-section">
                    <div className="row">
                        <input placeholder="Search for answers" />
                        <div className="search-button">
                            <img src={SearchImage} alt="search logo" width={17} height={17} />
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
