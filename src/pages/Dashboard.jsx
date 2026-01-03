import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { FaHome, FaHeart, FaPaperPlane, FaStar, FaChartLine, FaEye, FaEdit, FaMapMarkerAlt } from 'react-icons/fa';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: myProperties = [] } = useQuery({
    queryKey: ['myProperties', user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/properties/user/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const { data: myWishlist = [] } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/wishlist/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const { data: myRatings = [] } = useQuery({
    queryKey: ['myRatings', user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/ratings/user/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const { data: myInquiries = [] } = useQuery({
    queryKey: ['myInquiries', user?.email],
    queryFn: async () => {
      const { data} = await axiosInstance.get(`/inquiries/user/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const { data: receivedInquiries = [] } = useQuery({
    queryKey: ['receivedInquiries', user?.email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/inquiries/owner/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // Stats
  const stats = [
    {
      title: 'My Properties',
      value: myProperties.length,
      icon: FaHome,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
    },
    {
      title: 'Wishlist',
      value: myWishlist.length,
      icon: FaHeart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/30',
    },
    {
      title: 'My Reviews',
      value: myRatings.length,
      icon: FaStar,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/30',
    },
    {
      title: 'Inquiries Sent',
      value: myInquiries.length,
      icon: FaPaperPlane,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/30',
    },
    {
      title: 'Inquiries Received',
      value: receivedInquiries.length,
      icon: FaChartLine,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30',
    },
  ];

  // Property Type Distribution
  const propertyTypeData = {
    series: myProperties.reduce((acc, prop) => {
      const category = prop.category || 'Other';
      const index = acc.labels.indexOf(category);
      if (index >= 0) {
        acc.data[index]++;
      } else {
        acc.labels.push(category);
        acc.data.push(1);
      }
      return acc;
    }, { labels: [], data: [] }),
  };

  const donutOptions = {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
    },
    labels: propertyTypeData.series.labels,
    colors: ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'],
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
        },
      },
    },
  };

  // Monthly Activity Chart
  const monthlyData = {
    series: [
      {
        name: 'Properties Added',
        data: [2, 3, 1, 4, 2, 3, 5, 2, 3, 4, 3, 2],
      },
      {
        name: 'Reviews Given',
        data: [1, 2, 3, 2, 4, 3, 2, 5, 3, 2, 4, 3],
      },
    ],
    options: {
      chart: {
        type: 'line',
        fontFamily: 'inherit',
        toolbar: {
          show: false,
        },
      },
      colors: ['#10b981', '#3b82f6'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      legend: {
        position: 'top',
      },
      grid: {
        borderColor: '#f3f4f6',
      },
    },
  };

  // Average Rating Calculation
  const avgRating = myRatings.length > 0
    ? (myRatings.reduce((sum, r) => sum + (r.ratingValue || 0), 0) / myRatings.length).toFixed(1)
    : 0;

  const profileCompletion = 75; // Mock data

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 dark:text-white">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.displayName}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`${stat.bgColor} p-3 rounded-full`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Profile Completion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Profile Completion</CardTitle>
              <CardDescription>Complete your profile to get better recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Profile: {profileCompletion}%</span>
                </div>
                <Progress value={profileCompletion} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Property Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Property Distribution</CardTitle>
                <CardDescription>Your properties by category</CardDescription>
              </CardHeader>
              <CardContent>
                {propertyTypeData.series.data.length > 0 ? (
                  <Chart
                    options={donutOptions}
                    series={propertyTypeData.series.data}
                    type="donut"
                    height={300}
                  />
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No properties yet
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Monthly Activity</CardTitle>
                <CardDescription>Your activity over the year</CardDescription>
              </CardHeader>
              <CardContent>
                <Chart
                  options={monthlyData.options}
                  series={monthlyData.series}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Rating & Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Average Rating</CardTitle>
                <CardDescription>Your reviews rating</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-green-500">{avgRating}</div>
                  <div className="text-muted-foreground mt-2">out of 5.0</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Response Rate</CardTitle>
                <CardDescription>Inquiry response time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-500">92%</div>
                  <div className="text-muted-foreground mt-2">within 24h</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Total Views</CardTitle>
                <CardDescription>Property views</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-purple-500">1.2k</div>
                  <div className="text-muted-foreground mt-2">this month</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Properties Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Properties</CardTitle>
                  <CardDescription>Overview of your listed properties</CardDescription>
                </div>
                <Button asChild size="sm" className="bg-green-500 hover:bg-green-600">
                  <Link to="/add-property">Add New</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {myProperties.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FaHome className="mx-auto text-4xl mb-4 text-gray-300" />
                  <p>No properties listed yet</p>
                  <Button asChild variant="link" className="mt-2 text-green-500">
                    <Link to="/add-property">Add your first property</Link>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Property</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">Location</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 hidden lg:table-cell">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Price</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myProperties.slice(0, 5).map((property, index) => (
                        <tr key={property._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={property.imageUrl || '/staticassets/swiper1.jpg'} 
                                alt={property.propertyName}
                                className="w-12 h-12 rounded-lg object-cover hidden sm:block"
                              />
                              <div>
                                <p className="font-medium text-gray-800 dark:text-white line-clamp-1">{property.propertyName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {property.createdAt ? format(new Date(property.createdAt), 'MMM dd, yyyy') : 'N/A'}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                              <FaMapMarkerAlt className="text-green-500 text-xs" />
                              <span className="line-clamp-1">{property.location || 'N/A'}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 hidden lg:table-cell">
                            <Badge variant="outline">{property.category || 'N/A'}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-green-600 dark:text-green-400">
                              ৳{property.price?.toLocaleString() || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              {property.propertyFor || 'Active'}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Button asChild size="icon" variant="ghost" className="h-8 w-8">
                                <Link to={`/property/${property._id}`}>
                                  <FaEye className="text-gray-500" />
                                </Link>
                              </Button>
                              <Button asChild size="icon" variant="ghost" className="h-8 w-8">
                                <Link to={`/update-property/${property._id}`}>
                                  <FaEdit className="text-blue-500" />
                                </Link>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {myProperties.length > 5 && (
                    <div className="text-center mt-4">
                      <Button asChild variant="link" className="text-green-500">
                        <Link to="/my-properties">View all {myProperties.length} properties</Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

