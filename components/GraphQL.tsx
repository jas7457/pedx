import React, { ReactNode } from 'react';
import { QueryResult } from 'react-apollo';

export default function GraphQL<TData = any>(props: GraphQLProps<TData>) {
	const { result, children } = props;
	const { loading, error, data } = result;

	if (loading) {
		return <>Loading...</>;
	}
	return <>{error ? <>Error</> : data && <>{children(data)}</>}</>;
}

interface GraphQLProps<TData> {
	result: QueryResult<TData>;
	children: (data: TData) => ReactNode;
}
