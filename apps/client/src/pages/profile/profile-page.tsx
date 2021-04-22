import { useMutation } from '@apollo/client';
import { PersonOutlined } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../components/section-header';
import { UserProfileForm } from '../../components/user-profile-form';
import { UPDATE_CURRENT_USER, useUser } from '../../models/user';
import { UpdateCurrentUser } from '../../models/user/__generated-interfaces__/UpdateCurrentUser';

function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useUser();
  const [updateUser] = useMutation<UpdateCurrentUser>(UPDATE_CURRENT_USER);
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
      <UserProfileForm onSubmit={onFormSubmit} initialValues={user} />
    </section>
  );
}

export default ProfilePage;
