import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ArrowRight, Zap, Shield, Globe } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          JustARandomWebApp
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          A modern, full-stack web application built with cutting-edge technologies.
          Over 10 years of continuous development and innovation.
        </p>
        {!isAuthenticated && (
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                to="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              >
                Get started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                to="/login"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
              >
                Sign in
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="mt-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="pt-6">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white">
                  Lightning Fast
                </h3>
                <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                  Built with modern technologies for optimal performance and user experience.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white">
                  Secure by Default
                </h3>
                <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                  Enterprise-grade security with JWT authentication and encrypted data storage.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="flow-root bg-white dark:bg-gray-800 rounded-lg px-6 pb-8">
              <div className="-mt-6">
                <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white">
                  Scalable Architecture
                </h3>
                <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                  Microservices architecture designed to scale with your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

