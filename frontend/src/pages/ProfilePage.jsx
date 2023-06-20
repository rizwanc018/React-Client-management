import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useChangeProfileImageMutation, useUpdateMutation } from "../slices/usersApiSlice";
import { Image, Transformation } from 'cloudinary-react';
import Axios from "axios";


function ProfilePage() {
  const CLOUD_NAME = 'dz9knbtwi'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [imageUpload, setImageUpload] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()

  const { userInfo } = useSelector(state => state.auth)
  const [updateProfile, { isLoading, error }] = useUpdateMutation()
  const [updateProfileImage, { isUpLoading, errUploading }] = useChangeProfileImageMutation()

  const uploadImage = async () => {
    const formdata = new FormData()
    formdata.append('file', imageUpload)
    formdata.append('upload_preset', 'fpljsbae')
    try {
      const AxiosRes = await Axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formdata)
      const imgurl = AxiosRes.data.url
      setImage(imgurl)
      const res = await updateProfileImage({ _id: userInfo._id, imageUrl: AxiosRes.data.url }).unwrap()
      dispatch(setCredentials({ ...res }))
      toast.success('Profile image updated')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
    setImage(userInfo.image)
  }, [userInfo.name, userInfo.email, userInfo.email]);


  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword)
      toast.error('Passwords do not match')
    else {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }
  return (
    <>
      <FormContainer>
        <h1>Profile</h1>
        <div className="my-4">
          <div className="ms-5 mb-2 ">
            <Image className="rounded-circle" cloudName={CLOUD_NAME} publicId={image} width="150" height="150">
            </Image>

          </div>
          <input
            type="file"
            name="profileImage"
            onChange={e => { setImageUpload(e.target.files[0]) }} />
          {isUpLoading && <Loader />}
          <Button className="mt-3" onClick={uploadImage}>Change Image</Button>
        </div>
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
          {isLoading && <Loader />}

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>

      </FormContainer>
    </>

  )
}

export default ProfilePage