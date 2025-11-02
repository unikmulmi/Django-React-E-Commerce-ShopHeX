import ClipLoader from 'react-spinners/ClipLoader'

const Spinner = ({loading}) => {

    const override = {
                        display: "block",
                        margin: "0 auto",
                        borderColor: "purple",
};



  return (

    
       <ClipLoader
        loading={loading}
        cssOverride={override}
        size={450}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

  )
}

export default Spinner

