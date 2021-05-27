import { Chip } from '@material-ui/core';
import { AccountCircle, Cancel, CheckCircle, Videocam } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

export function ParticipantStatusChip() {
  const { t } = useTranslation();
  return <Chip size="small" color="primary" icon={<CheckCircle />} label={t('meetings.participation.participating')} />;
}

export function HostStatusChip() {
  const { t } = useTranslation();
  return <Chip size="small" color="primary" icon={<AccountCircle />} label={t('meetings.host')} />;
}

export function LiveStatusChip() {
  const { t } = useTranslation();
  return <Chip label={t('meetings.state.live')} size="small" color="secondary" icon={<Videocam />} />;
}

export function CanceledStatusChip() {
  const { t } = useTranslation();
  return <Chip label={t('meetings.state.canceled')} size="small" color="primary" icon={<Cancel />} />;
}
