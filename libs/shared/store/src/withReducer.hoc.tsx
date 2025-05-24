import React, { ComponentType, ReactNode } from 'react';
import { injectReducer } from './store';
import { Reducer } from '@reduxjs/toolkit';
import { ReactReduxContext } from 'react-redux';

export const withReducer = (key: string, reducer: Reducer) => (WrappedComponent: ComponentType) => {
  class Extended extends React.Component {
    static WrappedComponent = WrappedComponent;

    override componentWillMount(): void {
      injectReducer(key, reducer);
    }

    override render(): ReactNode {
      return <WrappedComponent  {...this.props} />
    }
  }

  Extended.contextType = ReactReduxContext;
  return Extended;
}

export default withReducer;
