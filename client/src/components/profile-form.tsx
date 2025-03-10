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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="male" />
                    <FormLabel className="font-normal">Male</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="female" />
                    <FormLabel className="font-normal">Female</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <RadioGroupItem value="other" />
                    <FormLabel className="font-normal">Other</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hobbies"
          render={() => (
            <FormItem>
              <FormLabel>Hobbies</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                {HOBBIES.map((hobby) => (
                  <FormField
                    key={hobby}
                    control={form.control}
                    name="hobbies"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
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
                        <FormLabel className="font-normal">{hobby}</FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between">
              <FormLabel>Enable Notifications</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </Form>
  );
}
