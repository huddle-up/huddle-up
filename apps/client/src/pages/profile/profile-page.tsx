import React from 'react';
import { useMutation } from '@apollo/client';
import { PersonOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import { SectionHeader } from '../../components/section-header';
import { UserProfileForm } from '../../components/user-profile-form';
import { UPDATE_CURRENT_USER, useUser } from '../../models/user';
import {
  UpdateCurrentUser,
  UpdateCurrentUserVariables,
} from '../../models/user/__generated-interfaces__/UpdateCurrentUser';
import DeleteAccountForm from '../../components/delete-account-form/delete-account-form';
import { ErrorCard } from '../../components/error';

function ProfilePage() {
  const { t } = useTranslation();
  const { user, error } = useUser();
  const [updateUser, { error: mutationError }] = useMutation<UpdateCurrentUser, UpdateCurrentUserVariables>(
    UPDATE_CURRENT_USER
  );
  const onFormSubmit = async ({ name, email, biography }) => {
    await updateUser({
      variables: {
        name,
        email,
        biography,
      },
    });
  };

  return (
    <section>
      <SectionHeader icon={<PersonOutlined />} title={t('profile.profile.profileSection')} />
      {(error || mutationError) && <ErrorCard detail={error.message} />}
      <UserProfileForm onSubmit={onFormSubmit} initialValues={user} />
      <SectionHeader icon={<OfflineBoltIcon />} title={t('profile.delete.dangerZoneSection')} dangerZone />
      <DeleteAccountForm id={user.id} />
    </section>
  );
}

export default ProfilePage;
