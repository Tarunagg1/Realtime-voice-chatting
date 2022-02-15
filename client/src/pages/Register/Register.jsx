import React, { Fragment, useState } from 'react'
import StepAvtar from '../Steps/StepAvtar/StepAvtar';
import StepName from '../Steps/StepName/StepName';
import StepOtp from '../Steps/StepOtp/StepOtp';
import StepPhoneEmail from '../Steps/StepPhoneEmail/StepPhoneEmail';
import StepUserName from '../Steps/StepUserName/StepUserName';
import './register.module.css';

const steps = {
    1:StepPhoneEmail,
    2:StepOtp,
    3:StepName,
    4:StepAvtar,
    5:StepUserName
}


export default function Register() {
    const [step,setStep] = useState(1);
    const CurrentStep = steps[step];
    
    const onNext = () =>{
      setStep(step+1)
    }

  return (
    <Fragment>
        <CurrentStep onNext={onNext} />
    </Fragment> 
  )
}
