import { FC } from 'react';

const AddQuoteButton: FC = () => {
    return (
        <div className="fixed-action-btn">
            <a
                href="#add-quote-modal"
                data-testid="addQuoteButton"
                className="btn-floating btn-large blue darken-2 modal-trigger"
            >
                <i className="large material-icons">add</i>
            </a>
        </div>
    );
};

export default AddQuoteButton;
