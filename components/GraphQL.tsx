import React, { ReactNode } from 'react';
import { QueryResult } from 'react-apollo';

export default function GraphQL(props: GraphQLProps) {
	const { result, children } = props;
	const { loading, error, data } = result;

	if (loading) {
		return <div>Loading...</div>;
	}
	return <>{error ? <div>Error</div> : data && <>{children(data)}</>}</>;
}

interface GraphQLProps {
	result: QueryResult;
	children: (data: any) => ReactNode;
}
