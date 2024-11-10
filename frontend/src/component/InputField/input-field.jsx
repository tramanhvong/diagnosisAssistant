import React from 'react';

const InputField = ({ placeholder }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-11 d-flex flex-wrap align-items-start">
                    <div className="input-group flex-grow-1">
                        <span className="input-group-text">
                            <i className="bi bi-paperclip"></i>
                        </span>
                        <textarea
                            type="text"
                            className="form-control"
                            placeholder={placeholder}
                        />
                    </div>
                </div>
                <div>
                    <button className="col-1 btn btn-primary mt-2 mt-md-0 ms-md-2">Send</button>
                </div>
            </div>
        </div>
    );
};

export default InputField;
