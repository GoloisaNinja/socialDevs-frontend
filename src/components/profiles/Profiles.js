import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import { getAllProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({
	getAllProfiles,
	profile: { profiles, loading, error },
}) => {
	useEffect(() => {
		getAllProfiles();
	}, []);
	return (
		<Fragment>
			<section className='container'>
				{loading ? (
					<Spinner />
				) : (
					<Fragment>
						<h1 className='large text-primary'>Developers</h1>
						<p className='lead'>
							<i className='fab fa-connectdevelop'></i> Browse and connect with
							fellow devs
						</p>
						<div className='profiles'>
							{error.status !== undefined ? (
								<h4>{error.msg}</h4>
							) : profiles.length > 0 ? (
								profiles.map((profile) => (
									<ProfileItem key={profile._id} profile={profile} />
								))
							) : (
								<Spinner />
							)}
						</div>
					</Fragment>
				)}
			</section>
		</Fragment>
	);
};

Profiles.propTypes = {
	getAllProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
