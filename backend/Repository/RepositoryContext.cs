using Entities.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RepositoryContext : IdentityDbContext<User, UserRole, Guid>
    {
        public RepositoryContext(DbContextOptions options) : base(options)
        {
            base.Database.EnsureCreated();
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasMany(u => u.Categories)
                .WithOne(c => c.User)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<User>()
                .HasMany(u => u.Subscriptions)
                .WithOne(s => s.User)
                .OnDelete(DeleteBehavior.Cascade);
                        
            builder.Entity<Category>()
                .HasMany(c => c.Subscriptions)
                .WithOne(s => s.Category)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Category>()
                .HasOne(c => c.User)
                .WithMany(u => u.Categories)
                .OnDelete(DeleteBehavior.NoAction);

            builder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .OnDelete(DeleteBehavior.NoAction);
        }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Category> Categories { get; set; }
    }
}
