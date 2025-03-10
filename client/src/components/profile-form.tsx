import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProfileSchema, type InsertProfile } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

const HOBBIES = [
  "Reading",
  "Gaming",
  "Sports",
  "Music",
  "Travel",
  "Cooking",
  "Art",
  "Photography",
];

interface ProfileFormProps {
  defaultValues?: Partial<InsertProfile>;
  onSubmit: (data: InsertProfile) => void;
  isSubmitting?: boolean;
}

export function ProfileForm({ defaultValues, onSubmit, isSubmitting }: ProfileFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(defaultValues?.imageUrl);

  const form = useForm<InsertProfile>({
    resolver: zodResolver(insertProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      age: 18,
      gender: "other",
      hobbies: [],
      notifications: false,
      ...defaultValues,
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview URL for the image
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);

    // Convert to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      form.setValue("imageUrl", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Image Upload */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="text-base cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-32 w-32 cursor-pointer ring-2 ring-primary/20">
                        <AvatarImage src={previewUrl} />
                        <AvatarFallback className="text-4xl bg-primary/10 text-primary">
                          {defaultValues?.name
                            ? defaultValues.name.split(" ").map((n) => n[0]).join("")
                            : <UploadCloud className="h-8 w-8" />}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        Click to upload profile picture
                      </span>
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-11 text-base bg-background"
                      placeholder="Enter your name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field} 
                      className="h-11 text-base bg-background"
                      placeholder="Enter your email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Phone</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      className="h-11 text-base bg-background"
                      placeholder="Enter your phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Age Field */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      className="h-11 text-base bg-background"
                      placeholder="Enter your age"
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Selection */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {["male", "female", "other"].map((gender) => (
                        <FormItem key={gender} className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={gender} />
                          </FormControl>
                          <FormLabel className="font-normal text-base capitalize">
                            {gender}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hobbies Selection */}
            <FormField
              control={form.control}
              name="hobbies"
              render={() => (
                <FormItem>
                  <FormLabel className="text-base">Hobbies</FormLabel>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {HOBBIES.map((hobby) => (
                      <FormField
                        key={hobby}
                        control={form.control}
                        name="hobbies"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(hobby)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(field.value || []), hobby]
                                    : field.value?.filter((value) => value !== hobby) || [];
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-base font-normal">
                              {hobby}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notifications Toggle */}
            <FormField
              control={form.control}
              name="notifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Notifications
                    </FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Receive notifications about your profile updates
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 text-base font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}