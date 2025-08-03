import { Navbar } from "@/components/Layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Scale, User, Shield, CheckCircle } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                LegalEase
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Create your account and start your legal journey today
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Fill in your details to create your LegalEase account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Create a strong password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
                </div>
                
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Client
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Scale className="w-4 h-4 mr-2" />
                      Lawyer
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full" size="lg">
                  Create Account
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary hover:underline">
                    Sign in here
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    Why Choose LegalEase?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Verified Lawyers</h4>
                      <p className="text-sm text-muted-foreground">
                        All lawyers are thoroughly vetted and licensed
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Secure Platform</h4>
                      <p className="text-sm text-muted-foreground">
                        Bank-level security for all your legal documents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-semibold">24/7 Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Get help whenever you need it
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    <div>
                      <h4 className="font-semibold">Transparent Pricing</h4>
                      <p className="text-sm text-muted-foreground">
                        No hidden fees or surprises
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">500+</div>
                      <div className="text-sm text-muted-foreground">Verified Lawyers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">10,000+</div>
                      <div className="text-sm text-muted-foreground">Happy Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">4.9/5</div>
                      <div className="text-sm text-muted-foreground">Average Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">24/7</div>
                      <div className="text-sm text-muted-foreground">Support Available</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 