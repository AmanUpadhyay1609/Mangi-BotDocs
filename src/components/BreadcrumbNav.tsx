
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const routeNames: Record<string, string> = {
  '/': 'Home',
  '/getting-started': 'Getting Started',
  '/jwt-auth': 'JWT Authentication',
  '/admin-approval': 'Admin Approval',
  '/session-crud': 'Session CRUD',
  '/context': 'Context (ctx)',
  '/logging': 'Logging System',
  '/context-deep-dive': 'Context Deep Dive',
  '/telegram-architecture': 'Telegram Bot Architecture',
  '/examples': 'Examples',
  '/contact': 'Contact Us',
};

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="mb-4 sm:mb-6 animate-fade-in">
      <Breadcrumb>
        <BreadcrumbList className="flex-wrap">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const displayName = routeNames[routeTo] || pathname;

            return (
              <React.Fragment key={routeTo}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-sm sm:text-base max-w-[150px] sm:max-w-none truncate">
                      {displayName}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={routeTo} className="text-sm sm:text-base max-w-[120px] sm:max-w-none truncate block">
                        {displayName}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbNav;
