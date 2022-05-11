// import { Counter } from './features/counter/Counter';
import SignUp from './features/auth/SignUp';
import Header from './features/header/Header';
// import PostsList from './features/posts/PostList';

function App() {
  return (
    <div>
        <Header/>
        {/* <PostsList /> */}
        <SignUp/>
    </div>
  );
}


//https://blog.bitsrc.io/setting-up-axios-interceptors-for-all-http-calls-in-an-application-71bc2c636e4e
export default App;
