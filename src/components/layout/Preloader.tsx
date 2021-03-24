import { FC } from "react";

const Preloader: FC = () => {
    return (
        <div className="progress blue lighten-4">
            <div className="indeterminate blue"></div>
        </div>
    );
};

export default Preloader;
