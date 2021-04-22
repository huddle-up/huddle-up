import { useMutation } from '@apollo/client';
import { PersonOutlined } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../../components/section-header';
import { UserProfileForm } from '../../components/user-profile-form';
import { UPDATE_USER, useUser } from '../../models/user';
import { UpdateUser } from '../../models/user/__generated-interfaces__/UpdateUser';

function ProfilePage() {
  const { t } = useTranslation();
  const { user } = useUser();
  const [updateUser] = useMutation<UpdateUser>(UPDATE_USER, { refetchQueries: ['CurrentUser'] });
  const onFormSubmit = async ({ name, email, biography }) => {
    await updateUser({
      variables: {
        id: user.id,
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
