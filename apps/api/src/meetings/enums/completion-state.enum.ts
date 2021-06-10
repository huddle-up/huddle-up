import { registerEnumType } from '@nestjs/graphql';

export enum CompletionState {
  OngoingOrFuture = 'ongoingOrFuture',
  CompletedOrPast = 'completedOrPast',
}

registerEnumType(CompletionState, { name: 'CompletionState', description: 'The completion state of a meeting' });
