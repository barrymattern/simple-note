import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import { fetchAllNotes } from '../store/notes';

const NavBar = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        const get_user_notes = async () => {
            await dispatch(fetchAllNotes(user.id));
            setLoaded(true);
        };

        get_user_notes();
    }, [dispatch, user]);

    if (!loaded) return null;

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/' exact={true} activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/login' exact={true} activeClassName='active'>
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sign-up' exact={true} activeClassName='active'>
                        Sign Up
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/users' exact={true} activeClassName='active'>
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/notes' exact={true} activeClassName='active'>
                        Notes
                    </NavLink>
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
