import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux'



function WelcomeComponent() {
    const { userInfo } = useSelector(state => state.auth)

    return (
        <div className=' py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>
                        Welcome <span className='text-info text-capitalize'>{userInfo.name}</span> 
                    </h1>
                    <div className='d-flex'>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, cupiditate. Cumque quas, cupiditate error fugiat quos porro autem deserunt deleniti molestias? Voluptas corporis provident fugiat.</p>
                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default WelcomeComponent