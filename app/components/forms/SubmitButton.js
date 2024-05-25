import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../AppButton';
import GradientBorderButton from '../GradientBorderButton';


function SubmitButton({title}) {
    const {handleSubmit} = useFormikContext();

    return (
        <GradientBorderButton title={title} onPress={handleSubmit}/>
    );
}

export default SubmitButton;