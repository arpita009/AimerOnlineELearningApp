import axios from 'axios'
import Swal from 'sweetalert2'

export const startAddCourse= (formData,clearForm) =>{
    return(
        (dispatch) =>{
            console.log('token now',localStorage.getItem('token'))
            axios.post(`https://dct-e-learning.herokuapp.com/api/courses`,formData,{
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response)=>{
                const addCourseResp= response.data
                // console.log('addCourseResp',addCourseResp)
                if(addCourseResp.hasOwnProperty('errors')){
                    Swal.fire({
                        icon : 'error',
                        title: addCourseResp.errors.category.message,
                        text: 'Choose values from '- addCourseResp.errors.category.properties.enumValues.join(',')
                    })
                    dispatch(addError(addCourseResp))
                }else{
                    dispatch(addCourse(addCourseResp))
                    clearForm()
                }
            }).catch((err)=>{
                alert(err.message)
            })
        }
    )
}

export const addError =(errorObj) =>{
    return{
        type: 'ADD_ERROR',
        payload: errorObj
    }
}

export const addCourse =(courseResp) =>{
    return{
        type: 'ADD_COURSE',
        payload: courseResp
    }
}

export const startGetAllCourses =() =>{
    return(
        (dispatch) =>{
            axios.get(`https://dct-e-learning.herokuapp.com/api/courses`,{
                "headers" : {
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response)=>{
                const allCoursesGetResp= response.data
                // console.log('allCoursesGetResp',allCoursesGetResp)
                dispatch(getAllCoursesInfo(allCoursesGetResp))
            }).catch((err)=>{
                alert(err.message)
            })
        }
    )
}

export const getAllCoursesInfo =(allCoursesGetResp) =>{
    return{
        type: 'ALL_COURSES_INFO',
        payload: allCoursesGetResp
    }
}

export const startDeleteCourse = (id) =>{
    return(
        (dispatch) =>{
            axios.delete(`https://dct-e-learning.herokuapp.com/api/courses/${id}`,{
                headers: {
                    'Authorization' : localStorage.getItem('token')
                }
            }).then((response) =>{
                const deleteCourseResp = response.data
                // console.log('deleteCourseResp',deleteCourseResp)
                Swal.fire({
                    icon:'warning',
                    title: 'Are you sure you want to delete?',
                    showDenyButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: 'No',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        dispatch(deleteCourse(deleteCourseResp))
                        Swal.fire('Deleted!', '', 'success')
                    } else if (result.isDenied) {
                      Swal.fire('Your Course is safe', '', 'info')
                    }
                  })
            }).catch((err) =>{
                alert(err.message)
            })

        }
    )
}
export const deleteCourse =(deleteCourseResp) =>{
    return{
        type: 'DELETE_COURSE',
        payload: deleteCourseResp
    }
}