import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions';
import { HEADER, URL } from '../../common';

class Header extends PureComponent {

    onKeySelect = (event, activeKey) => {
        event.preventDefault();
        if (activeKey === 'login') {
            this.props.logout();
        }
        this.props.history.push(`${URL}/${activeKey}`);
    };

    render() {
        const isLoggedIn = this.props.usersReducer.get('isLoggedIn');
        const navOptions = Object.keys(HEADER).map(key => {
            const isActiveKey = isLoggedIn && this.props.pathname === `${URL}/${key}`;
            const keyClasses = [];
            if (isActiveKey) {
                keyClasses.push('active');
            }
            if (!isLoggedIn) {
                keyClasses.push('disabled');
            }
            return (
                <li className={keyClasses.join(' ')} key={key}>
                    <a href={`/${key}`} onClick={e => this.onKeySelect(e, key)}>{HEADER[key]}</a>
                </li>
            );
        });

        let userDetail = null;

        if (isLoggedIn) {
            const user = this.props.usersReducer.get('user');
            userDetail = (
                <ul className="nav navbar-nav navbar-right">
                    <li className="custom-nav-item">Hello, {`${user.name}`}</li>
                    <li><a href="/login" onClick={e => this.onKeySelect(e, 'login')}>Logout</a></li>
                </ul>
            );
        }
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            {navOptions}
                        </ul>
                        {userDetail}
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({ usersReducer }) => ({ usersReducer });

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

Header.propTypes = {
    usersReducer: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);