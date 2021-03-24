import { FC } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { useFilmsContext } from '../../data/film/useFilms'

const EditQuoteModal : FC = () => {
    const { removeQuote } = useFilmsContext();

    const onSubmit = () => {
        removeQuote();

        M.toast({ html: 'Quote deleted' });
    };

    return (
        <div id="delete-quote-modal" className="modal">
            <div className="modal-content">
                <span>Are you sure you want to delete a quote?</span>
            </div>
            <div className="modal-footer">
                <a
                    href="#!"
                    className="modal-close waves-effect blue btn"
                    data-testid="deleteQuoteCancel"
                    style={{ marginRight: '10px' }}
                >
                    No
                </a>
                <a
                    href="#!"
                    data-testid="deleteQuoteSubmit"
                    onClick={onSubmit}
                    className="modal-close waves-effect blue btn"
                >
                    Yes
                </a>
            </div>
        </div>
    );
};

export default EditQuoteModal;
