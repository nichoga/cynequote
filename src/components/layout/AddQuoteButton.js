import React from 'react';

const AddQuoteButton = () => {
    return (
        <div className="fixed-action-btn">
            <a
                href="#add-quote-modal"
                className="btn-floating btn-large blue darken-2 modal-trigger"
            >
                <i className="large material-icons">add</i>
            </a>
        </div>
    );
};

export default AddQuoteButton;
