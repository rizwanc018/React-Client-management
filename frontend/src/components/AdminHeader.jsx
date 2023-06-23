import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { useLogoutMutation } from '../slices/adminApiSlice';
import { clearCredentials } from '../slices/authSlice';

const AdminHeader = () => {
    const { userInfo } = useSelector(state => state.auth)
    const [logOut] = useLogoutMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = async () => {
        try {
            await logOut().unwrap()
            dispatch(clearCredentials())
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand className='text-danger'>Client Management Admin</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {userInfo ? (<>
                                <NavDropdown title={userInfo.name} id='username'>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>) : (<>
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <FaSignInAlt /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/register'>
                                    <Nav.Link>
                                        <FaSignOutAlt /> Sign Up
                                    </Nav.Link>
                                </LinkContainer>
                            </>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    );
};

export default AdminHeader;