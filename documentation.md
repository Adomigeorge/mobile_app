# User Profile Management Application Documentation

## Application Structure

### Frontend Components

1. **Navigation (`navigation.tsx`)**
   - Bottom navigation bar with two sections:
     - Home: Shows welcome screen
     - Profiles: Shows list of user profiles
   - Uses `wouter` for routing
   - Styled with Tailwind CSS and shadcn components

2. **Profile Form (`profile-form.tsx`)**
   - Handles both creation and editing of profiles
   - Features:
     - Profile picture upload with preview
     - Form fields: name, email, phone, age
     - Gender selection (radio buttons)
     - Hobbies selection (checkboxes)
     - Notifications toggle (switch)
   - Uses React Hook Form with Zod validation
   - Image handling:
     ```typescript
     const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
       const file = e.target.files?.[0];
       if (!file) return;
       
       // Create preview URL
       const fileUrl = URL.createObjectURL(file);
       setPreviewUrl(fileUrl);
       
       // Convert to base64 for storage
       const reader = new FileReader();
       reader.onloadend = () => {
         form.setValue("imageUrl", reader.result as string);
       };
       reader.readAsDataURL(file);
     };
     ```

3. **Profile Card (`profile-card.tsx`)**
   - Displays user profile information
   - Features:
     - Circular avatar with uploaded image or initials fallback
     - Favorite toggle button
     - Edit and delete actions
     - Organized display of user details
   - Implementation:
     ```typescript
     <Avatar className="h-20 w-20 ring-2 ring-primary/20">
       <AvatarImage src={profile.imageUrl} />
       <AvatarFallback className="text-xl bg-primary/10 text-primary">
         {profile.name.split(" ").map((n) => n[0]).join("")}
       </AvatarFallback>
     </Avatar>
     ```

### Pages

1. **Home Page (`home.tsx`)**
   - Welcome screen with:
     - Greeting message
     - Floating Action Button for new profile creation
   - Clean, minimal design

2. **Profiles Page (`profiles.tsx`)**
   - Lists all created profiles
   - Features:
     - Loading state
     - Error handling
     - Empty state with call-to-action
     - List of profile cards

3. **Create/Edit Profile Pages**
   - Form for profile management
   - Handles image upload
   - Form validation
   - Success/error notifications

### Data Management

1. **Schema (`schema.ts`)**
   - Defines profile structure:
   ```typescript
   export const profiles = pgTable("profiles", {
     id: serial("id").primaryKey(),
     name: text("name").notNull(),
     email: text("email").notNull(),
     phone: text("phone").notNull(),
     age: integer("age").notNull(),
     gender: text("gender").notNull(),
     hobbies: text("hobbies").array().notNull(),
     notifications: boolean("notifications").notNull().default(false),
     favorite: boolean("favorite").notNull().default(false),
     imageUrl: text("imageUrl"),
   });
   ```

2. **API Integration (`queryClient.ts`)**
   - Handles API requests
   - Manages data caching
   - Real-time updates

## Key Features

1. **Image Upload**
   - Supports profile picture uploads
   - Provides preview before submission
   - Falls back to initials if no image

2. **Form Validation**
   - Name: minimum 2 characters
   - Email: valid email format
   - Phone: valid phone number format
   - Age: minimum 13 years
   - Hobbies: at least one selected

3. **Profile Management**
   - Create new profiles
   - Edit existing profiles
   - Delete profiles
   - Toggle favorite status

4. **Responsive Design**
   - Mobile-first approach
   - Bottom navigation
   - Floating action button
   - Card-based layout

## Styling

- Uses Tailwind CSS for styling
- Custom theme configuration:
  ```json
  {
    "variant": "professional",
    "primary": "hsl(262.1 83.3% 57.8%)",
    "appearance": "light",
    "radius": 0.5
  }
  ```
- Material Design-inspired components
- Consistent spacing and typography

## Best Practices

1. **Component Organization**
   - Separate components for reusability
   - Clear component responsibilities
   - Consistent props interface

2. **State Management**
   - React Query for server state
   - Local state for UI interactions
   - Proper error handling

3. **User Experience**
   - Loading states
   - Error feedback
   - Success notifications
   - Smooth transitions

4. **Code Structure**
   - TypeScript for type safety
   - Modular component design
   - Clear file organization
