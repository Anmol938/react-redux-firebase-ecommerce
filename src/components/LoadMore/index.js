import React from "react";
import Button from './../forms/Button';

const LoadMore = ({
    onLoadMoreEvt = () => { },
}) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '150px', margin: '0 auto' }}>
            <Button onClick={() => onLoadMoreEvt()}>
                Load More
            </Button>
        </div>
    );
};

export default LoadMore;
