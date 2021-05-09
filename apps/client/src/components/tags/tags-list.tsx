import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { Tags_tags } from '../../models/tags/__generated-interfaces__/Tags';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    icon: {
      marginTop: theme.spacing(1),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

interface TagsListProps {
  tags: Tags_tags[];
}

function TagsList({ tags }: TagsListProps) {
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      {tags && tags.length > 0 && (
        <>
          <li key="0">
            <LocalOfferIcon className={classes.icon} />
          </li>
          {tags.map((tag) => (
            <li key={tag.id}>
              <Chip label={tag.name} className={classes.chip} />
            </li>
          ))}
        </>
      )}
    </ul>
  );
}

export default TagsList;
