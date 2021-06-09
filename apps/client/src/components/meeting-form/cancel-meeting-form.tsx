import { useMutation } from '@apollo/client';
import { Button, Card, CardContent, CircularProgress, Collapse, Grid, Typography } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CANCEL_MEETING, isCanceled } from '../../models/meetings';
import { CancelMeeting, CancelMeetingVariables } from '../../models/meetings/__generated-interfaces__/CancelMeeting';
import { MeetingFields } from '../../models/meetings/__generated-interfaces__/MeetingFields';

interface CancelMeetingProps {
  meeting: MeetingFields;
}

function CancelMeetingForm({ meeting }: CancelMeetingProps) {
  const { t } = useTranslation();
  const [mutate, { loading }] = useMutation<CancelMeeting, CancelMeetingVariables>(CANCEL_MEETING);
  const [showCancel, setShowCancel] = useState(false);
  const canceled = isCanceled(meeting);
  const cancel = () => {
    mutate({
      variables: {
        id: meeting.id,
      },
    });
  };
  return (
    <Card variant="outlined">
      <CardContent>
        <Collapse in={canceled}>
          <Typography component="p">{t('meetings.cancel.canceled')}</Typography>
        </Collapse>
        <Collapse in={!canceled}>
          <Grid container justify="space-between" alignItems="center">
            <Typography component="p">{t('meetings.cancel.description')}</Typography>
            {showCancel ? (
              <Button
                onClick={cancel}
                disabled={loading}
                color="primary"
                variant="contained"
                startIcon={loading ? <CircularProgress size="1em" /> : <Cancel />}>
                {t('meetings.cancel.confirm')}
              </Button>
            ) : (
              <Button onClick={() => setShowCancel(true)} color="primary" variant="outlined" startIcon={<Cancel />}>
                {t('meetings.cancel.cancel')}
              </Button>
            )}
          </Grid>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default CancelMeetingForm;
