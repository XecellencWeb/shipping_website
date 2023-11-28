import React from 'react'


type formProps = {
    heading:string,
    buttonText:string


}

const FormGenerator = ({heading,buttonText}:formProps) => {
  return (
    <div className='min-h-screen wrapper my-20'>
        <form className="flex flex-col">
            <h1 className="">{heading}</h1>
            <div className="">
                <h1 className="">Distance</h1>
                <div className="">
                    <div className=""><input type="radio" name="" id="" /></div>
                    <div className=""><input type="radio" name="" id="" /></div>
                </div>
            </div>

            <div className="">

            </div>

            <div className="">

            </div>

            <div className="">

            </div>
            <button className="">{buttonText}</button>
        </form>
    </div>
  )
}

export default FormGenerator