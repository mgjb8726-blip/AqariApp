import App from '../page-client';
export default function CatchAll({ params }: { params: { slug?: string[] } }) { return <App slug={params.slug || []}/>; }