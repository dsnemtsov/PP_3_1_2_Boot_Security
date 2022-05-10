import React from 'react';

const MyInput = React.forwardRef((props, ref) => {
    return (
        <div>
            <input ref={ref} {...props}/>
        </div>
    );
});

export default MyInput;